import Todos from './Todos';

import AddTodo from '../../components/AddElement';
import FilterTodo from './FilterTodo';
import ErrorBoundary from '../../components/ErrorBoundary';

const Mytodos = ({
    manageClick,
    activeFilter,
    onFilterTodo,
    todoEl,
    todos,
}) => {
    return (
        <>
            <h1>MY TODO LIST</h1>
            <div className='col-md-6'>
                <AddTodo Ele={todoEl} manageClick={manageClick} />
                <ErrorBoundary>
                    <Todos todos={todos} />
                </ErrorBoundary>

                <FilterTodo filter={activeFilter} onFilter={onFilterTodo} />
            </div>
        </>
    );
};
export default Mytodos;
