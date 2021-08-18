

const FilterTodo = ({onFilter,filter}) => {
    return (
        <div className="row d-flex">
            <div className="col-sm-4">
                <button disabled = {filter ==='ALL'} onClick={() => onFilter('ALL')} className ="btn btn-outline-info">ALL</button>
            </div>
            <div className="col-sm-4">
                <button  disabled = {filter ==='TODO'}  onClick = {onFilter.bind(null, 'TODO')} className ="btn btn-outline-info">TO DO</button>
            </div>
            <div className="col-sm-4">
                <button  disabled = {filter ==='COMPLETED'}   onClick = {onFilter.bind(null, 'COMPLETED')} className ="btn btn-outline-info">COMPLETED</button>
            </div>
        </div>
    )
}

export default FilterTodo;
