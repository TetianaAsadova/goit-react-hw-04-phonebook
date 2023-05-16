import React from "react";
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, changeFilter }) => (
        <label className={css.filter}>
            <p className={css.filter__filter}>Find contacts by name</p>
            <input
                type='text'
                value={value}
                onChange={changeFilter}
            />
        </label>
)

Filter.propTypes = {
    value: PropTypes.string,
}

export default Filter;