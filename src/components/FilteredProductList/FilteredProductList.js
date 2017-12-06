import React, { Component } from 'react'
import { connect } from 'react-redux'
import { productList, actions as productsActions } from '../../ducks/products'
import List from '../List'
import Product from '../Product/Product'
import Pagination from './Pagination'
import Filter from './Filter'

import './FilteredProductList.css'

class FilteredProductList extends Component {

  componentWillMount() {
    this.props.fetchProducts()
  }

  render() {

    const {
      products
    } = this.props

    return (
      <div className='FilteredProductList'>

        {/* FILTER */}
        <Filter className='FilteredProductList-Filter' />

        <List
          className='FilteredProductList-List'
          classNameItem='FilteredProductList-List-item'
          list={products}

          render={
            ({ item }) => <Product actions={this.props.actions} product={item} />
          }
        />

        {/* PAGINATION */}
        <Pagination className='FilteredProductList-Pagination' />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: productList(state.products)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(productsActions.fetchProducts())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilteredProductList)