import React, { Component, Fragment } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Fuse from 'fuse.js';


const options = {
    isCaseSensitive: false,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    useExtendedSearch: false,
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    keys: [
        "name"
    ]
};


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: {
                name: '',
            }
        }
    }

    fuseIns;


    // Handle Input Change
    handleChange = (prop, value) => {
        const filter = Object.assign({}, this.state.filter, { [prop]: value });
        console.log(filter);
        // const filteredData = this.filterData(this.state)
    }


    componentDidMount() {
        axios.get('http://localhost:8080/list')
            .then(response => {
                const results = response.data;
                console.log(results);
                this.fuseIns = new Fuse(results, options);

                // this.setState({
                //     values: results,
                //     filteredValues: results,
                //     states: _.chain(results)
                //         .map(result => _.get(result, ['address', 'state']))
                //         .uniq()
                //         .value(),
                //     district: _.chain(results)
                //         .map(result => _.get(result, ['address', 'district']))
                //         .uniq()
                //         .value(),
                //     city: _.chain(results)
                //         .map(result => _.get(result, ['address', 'city']))
                //         .uniq()
                //         .value(),
                // })
            })
            .catch(err => console.log(err))
    }

    // Filter data 
    filterData(data, filter) {
        const items = this.fuseIns.search(filter.name).map(it => it.item._id);
        console.log(items);
        // return data.filter(item => {
        //     let ok = true;
        //     for (let prop in filter) {
        //         if (prop === 'funding' && item['funding'] !== filter[prop] && filter[prop]) {
        //             ok = false;
        //         } else if (prop === 'state' && _.get(item, ['address', 'state']) !== filter[prop] && filter[prop].length !== 0) {
        //             ok = false;
        //         }
        //         else if (prop === 'district' && _.get(item, ['address', 'district']) !== filter[prop] && filter[prop].length !== 0) {
        //             ok = false;
        //         }
        //         else if (prop === 'city' && _.get(item, ['address', 'city']) !== filter[prop] && filter[prop].length !== 0) {
        //             ok = false;
        //         } else if (prop === 'name' && filter[prop].length > 0 && !items.includes(item._id)) {
        //             ok = false;
        //         }
        //     }
        //     return ok;
        // })
    }

    render() {
        const { name } = this.state;
        return (
            <Fragment>
                <div className="form-inline d-flex search-bar justify-content-center p-4">
                    <input
                        className="form-control form-control-sm ml-3 col-md-4"
                        type="text"
                        placeholder=""
                        aria-label="Search"
                        value={name}
                        onChange={(e) => this.handleChange('name', e.target.value)}
                    />
                </div>
            </Fragment>
        );
    }
}

export default Search;