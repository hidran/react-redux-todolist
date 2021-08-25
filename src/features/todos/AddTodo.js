import PropTypes from 'prop-types';
const AddTodo = ({ todoEl, manageClick }) => {
    return (
        <form onSubmit={manageClick}>
            <div className='form-group'>
                <input
                    ref={todoEl}
                    className='form-field'
                    name='todo'
                    id='todo'
                />
                <button className=' m-1 btn btn-success'>ADD</button>
            </div>
        </form>
    );
};
AddTodo.propTypes = {
    todoEl: PropTypes.object,
    manageClick: PropTypes.func.isRequired,
};
export default AddTodo;
