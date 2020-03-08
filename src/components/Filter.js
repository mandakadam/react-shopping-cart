import React from 'react';

const Filter = ({count, sort, size, handleSortChange, handleSizeChange}) =>{
    return(
        <div className="d-flex justify-content-between mb-3 flex-wrap">
            <div className="mb-3 mb-lg-0">
                {`${count} products found.`}
            </div>
            <div className="d-flex">
                <div>
                    <div className="form-inline mr-3">
                        <label className="mr-2">Order by</label>
                        <select className="form-control" value={sort} onChange={handleSortChange}>
                            <option value="">Select</option>
                            <option value="lowestprice">Lowest to highest</option>
                            <option value="highestprice">Highest to lowest</option>
                        </select>
                        </div>
                    </div>
                <div>
                    <div className="form-inline">
                        <label className="mr-2"> Filter Size</label>
                        <select className="form-control" value={size} onChange={handleSizeChange}>
                            <option value="">ALL</option>
                            <option value="x">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  Filter