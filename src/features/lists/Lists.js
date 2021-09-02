import List from './List';
import {
    useGetListsQuery,
    useDeleteListMutation,
    useAddListMutation,
} from '../../service/listsService';
import { toast } from 'react-toastify';
import React, { useEffect, useRef } from 'react';
import AddList from '../../components/AddElement';
const Lists = () => {
    const listEl = useRef('');
    const {
        data: lists = [],
        error,
        isLoading,
        isFetching,
        refetch: reloadLists,
    } = useGetListsQuery();

    const [
        removeList,
        { isLoading: isDeleting, isSuccess, error: deleteError, isError },
    ] = useDeleteListMutation();

    const [
        addList,
        {
            isLoading: isAdding,
            isSuccess: isAddSuccess,
            error: addError,
            isError: isAddError,
        },
    ] = useAddListMutation();

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (isFetching) {
            toast.info('Loading lists');
        }
        if (!isFetching) {
            toast.dismiss();
        }
        return () => {};
    }, [error, isFetching]);

    const manageClick = (evt) => {
        evt.preventDefault();
        addList({ name: listEl.current.value, user_id: 1 });
    };
    if (isAddSuccess) {
        listEl.current.value = '';
    }
    return (
        <>
            <h1>My lists</h1>
            <AddList
                Ele={listEl}
                manageClick={manageClick}
                txtButton={'Add list'}
            />
            <ul className='list-group list-group-flush' id="ListList">
                {lists.map((list) => (
                    <List
                        onRemoveList={(id) => {
                            removeList(id)
                                .unwrap()
                                .then(() => {
                                    // reloadLists();
                                })
                                .catch((err) => toast.error(err.message));
                        }}
                        key={list.id}
                        list={list}
                    />
                ))}
            </ul>
        </>
    );
};
export default Lists;
