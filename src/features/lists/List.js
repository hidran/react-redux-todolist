import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
export default function List({ list, onRemoveList }) {
    return (
        <li className='list-group-item'>
            <div className='row'>
                <div className='col-md-6 text-start'>
                    <NavLink
                        to={
                            '/lists/' +
                            list.id +
                            '/todos?list_name=' +
                            encodeURIComponent(list.name)
                        }>
                        {list.name}
                    </NavLink>
                </div>
                <div className='col-md-6'>
                    <Link
                        to={
                            '/lists/' +
                            list.id +
                            '/edit?list_name=' +
                            encodeURIComponent(list.name)
                        }
                        className='me-2 btn btn-success btn-sm'>
                        <i className='bi bi-pencil-fill'></i>
                    </Link>
                    <button
                        className='btn btn btn-danger btn-sm'
                        onClick={onRemoveList.bind(null, list.id)}>
                        <i className='bi bi-trash'></i>
                    </button>
                </div>
            </div>
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
