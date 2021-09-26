const FieldError = ({ errors = [] }) => {
    if (!errors.length) {
        return null;
    }
    return (
        <div className='alert alert-danger'>
            {errors.map((error) => (
                <p> {error} </p>
            ))}
        </div>
    );
};

export default FieldError;
