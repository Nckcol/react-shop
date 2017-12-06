import requests
from bs4 import BeautifulSoup
import pprint
import re
import json


class ShoeSiteScraper:

    def __init__(self, url_list=None):
        self.urls = url_list
        self.parsed_pages = {'products': []}
        self.parsed_page = {}
        self.output_json = None

    def parse_url_list(self, url_list=None):
        if url_list:
            self.urls = url_list
        elif not self.urls:
            raise ValueError("Please provide list of urls to parse")

        for url in self.urls:
            self.parsed_pages['products'].append(self.parse_page(url))

        self.output_json = json.dumps(self.parsed_pages, indent=4, sort_keys=True)
        return self.output_json

    def parse_page(self, page_url):
        page = requests.get(page_url)
        page_content = BeautifulSoup(page.content, 'html.parser')
        self.parsed_page = self._create_page_structure()

        self._parse_general_info(page_content)
        self._parse_description(page_content)
        self._parse_properties(page_content)
        self._parse_price(page_content)
        self._parse_img_urls(page_content)
        self._parse_models(page_content)

        # TODO parse options

        return self.parsed_page

    @staticmethod
    def _create_page_structure():
        page = {
            "id": 0,
            "SKU": "",
            "title": "",
            "brand": "",
            "category": "",
            "gender": "Men",
            "price": {
                "actual": 0,
                "default": 0,
                "discount": 0
                },
            "availability": True,
            "photos": [],
            "options": [],
            "models": [],
            "description": "",
            "properties": [],
        }
        return page

    def _parse_general_info(self, page_content):
        global_config = None
        script_list = page_content.findAll("script", type="text/javascript")
        for script in script_list:
            g = re.search(re.compile('var globalConfig = {"pagetype"'), script.contents[0])
            if g:
                global_config = re.sub(re.compile('var globalConfig = '), "", script.contents[0])
                break

        if not global_config:
            return
        global_config = global_config.strip()[:-1]
        global_config_json = json.loads(global_config)
        if 'product' in global_config_json:
            if 'name' in global_config_json['product']:
                self.parsed_page['title'] = global_config_json['product']['name']
            if 'brand' in global_config_json['product']:
                self.parsed_page['brand'] = global_config_json['product']['brand']
            if 'category' in global_config_json['product']:
                self.parsed_page['category'] = global_config_json['product']['category']
            if 'gender' in global_config_json['product']:
                self.parsed_page['category'] = global_config_json['product']['gender']
            if 'availability' in global_config_json['product']:
                if global_config_json['product']['availability'] == "":
                    pass
                elif global_config_json['product']['availability'] == 'yes' \
                        or global_config_json['product']['availability'] == 'Yes' \
                        or global_config_json['product']['availability'] == 'True':
                    self.parsed_page['availability'] = True
                else:
                    self.parsed_page['availability'] = False
            if 'rDetails' in global_config_json['product']:
                if 'sku' in global_config_json['product']['rDetails']:
                    self.parsed_page['SKU'] = global_config_json['product']['rDetails']['sku']

    def _parse_description(self, page_content):
        description = page_content.find(class_="prod-disc")
        if description:
            desc_p = description.find('p')
            if desc_p:
                self.parsed_page['description'] = desc_p.contents[0].encode('utf-8').strip()

    def _parse_properties(self, page_content):
        properties = page_content.find(class_="prod-main-wrapper")
        if properties:
            p = properties.find('li')
            if p:
                is_next_p = self._add_property(p)
                while is_next_p:
                    p = p.find_next_sibling('li')
                    if p and 'class' in p.attrs.keys():
                        break
                    else:
                        is_next_p = self._add_property(p)

    def _add_property(self, p):
        if p:
            title = p.find('span')
            value = title.find_next_sibling('span')
            if title and value:
                self.parsed_page["properties"].append({'title': title.contents[0],
                                                       'value': value.contents[0],
                                                       'base': ''})
            return True
        return False

    def _parse_price(self, page_content):
        prices = page_content.find(class_="price discounts")
        if prices:
            if(prices.find(class_='actual-price')):
                self.parsed_page['price']['actual'] = str(prices.find(class_='actual-price').contents[0])
            if(prices.find(class_='standard-price')):
                self.parsed_page['price']['default'] = str(prices.find(class_='standard-price').contents[0])
            discount = False
            if(prices.find(class_='discount productDiscount')):
                discount = prices.find(class_='discount productDiscount').contents[0]
            if discount:
                discount_value = re.search(re.compile('[0-9]+'), discount).group(0)
                if discount_value:
                    self.parsed_page['price']['discount'] = discount_value

    def _parse_img_urls(self, page_content):
        img_urls = page_content.find(class_='carousel')
        if img_urls:
            img_tags = img_urls.findAll('img', class_=re.compile('primary-image'))
            if img_tags:
                for img_tag in img_tags:
                    img_dict = json.loads(img_tag['data-img-config'])
                    base_path = img_dict['base_path']

                    xxs, xs, l = None, None, None
                    if base_path and '320' in img_dict:
                        xxs = base_path + img_dict['320']
                    if base_path and '500' in img_dict:
                        xs = base_path + img_dict['500']
                    if base_path and '1024' in img_dict:
                        l = base_path + img_dict['1024']
                    self.parsed_page['photos'].append({"main": l, "thumb": xxs, "2x": xs})

    def _parse_models(self, page_content):
        models = page_content.find('ul', class_='options')
        if models:
            models_tag = models.findAll('li', class_=re.compile('first popover-options'))

            for model in models_tag:
                size = model.find('a').contents[0].contents[0]
                count = model.find('a')['data-quantity']
                self.parsed_page['models'].append({
                                                      "color": {
                                                        "name": "",
                                                        "value": ""
                                                      },
                                                      "size": size,
                                                      "count": count
                                                    },)

    @staticmethod
    def test_one_page():
        l1 = 'https://www.jabong.com/Reebok-Reebok-Zjet-Soul-Grey-Running-Shoes-2694385.html' \
             '?pos=6&cid=RE105SH14HUFINDFAS'
        res = ShoeSiteScraper().parse_page(l1)
        pprint.pprint(res)


if __name__ == "__main__":
    l = [
        'https://www.jabong.com/Reebok-Reebok-Zjet-Soul-Grey-Running-Shoes-2694385.html',
        'https://www.jabong.com/Nike-Flex-Experience-Rn-6-Navy-Blue-Running-Shoes-300173874.html',
        'https://www.jabong.com/Lee_Cooper-Navy-Blue-Running-Shoes-300076743.html',
        'https://www.jabong.com/Nike-Lunarconverge-Black-Running-Shoes-300115364.html',
        'https://www.jabong.com/Red_Chief-Tan-Outdoor-Shoes-2013667.html',
        'https://www.jabong.com/superdry-Winter-Dakar-Brown-Boots-300000360.html',
        'https://www.jabong.com/Red_Tape-Brown-Boots-300271067.html',
        'https://www.jabong.com/johnston-murphy-Collins-Cap-Toe-Brown-Derby-Formal-Shoes-300268418.html',
        'https://www.jabong.com/Aldo-Krasnoff-Navy-Blue-Sneakers-300088298.html',
        'https://www.jabong.com/Woodland-Black-Lifestyle-Shoes-300227163.html'
    ]

    res = ShoeSiteScraper().parse_url_list(l)

    with open("./result.json", "w") as f:
        f.write(res)

    # Fast check one page
    # ShoeSiteScraper().test_one_page()
