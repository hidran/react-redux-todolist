import PropTypes from 'prop-types';
const AddElement = ({ Ele, manageClick, txtButton }) => {
    return (
        <form onSubmit={manageClick}>
            <div className='form-group'>
                <input ref={Ele} className='form-field' name='ele' id='ele' />
                <button className=' m-1 btn btn-success'>
                    {txtButton ?? 'ADD'}
                </button>
            </div>
        </form>
    );
};
AddElement.propTypes = {
    todoEl: PropTypes.object,
    manageClick: PropTypes.func.isRequired,
};
export default AddElement;
