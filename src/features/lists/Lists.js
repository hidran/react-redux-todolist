import List from './List';
const Lists = ({ lists }) => {
    return (
        <ul className='list-group list-group-flush'>
            {lists.map((list) => (
                <List key={list.id} list={list} />
            ))}
        </ul>
    );
};
export default Lists;
