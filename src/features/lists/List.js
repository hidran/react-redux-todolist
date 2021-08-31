import PropTypes from 'prop-types';
export default function List({ list }) {
    return (
        <li className='list-group-item d-flex justify-content-between'>
            <span>{list.name}</span>
            <button className='btn btn-danger btn-sm'>
                <li className='bi bi-trash'></li>
            </button>
        </li>
    );
}
List.propTypes = {
    list: PropTypes.shape({
        name: PropTypes.bool,
        created_at: PropTypes.string,
        user_id: PropTypes.number,
        id: PropTypes.number,
    }),
};
