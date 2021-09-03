import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
export default function List({ list, onRemoveList }) {
    return (
        <li className='list-group-item d-flex justify-content-between'>
            <NavLink to={'/lists/' + list.id + '/todos?list_name=' + encodeURIComponent(list.name)}>{list.name}</NavLink>
            <button
                className='btn btn-danger btn-sm'
                onClick={onRemoveList.bind(null, list.id)}>
                <li className='bi bi-trash'></li>
            </button>
        </li>
    );
}
List.propTypes = {
    list: PropTypes.shape({
        name: PropTypes.string,
        created_at: PropTypes.string,
        user_id: PropTypes.number,
        id: PropTypes.number,
    }),
};
