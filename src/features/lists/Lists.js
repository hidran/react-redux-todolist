import List from './List';
import {
    useGetListsQuery,
    useDeleteListMutation,
} from '../../service/listsService';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react';

const Lists = () => {
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
    return (
        <>
            <h1>My lists</h1>
            <ul className='list-group list-group-flush'>
                {lists.map((list) => (
                    <List
                        onRemoveList={(id) => {
                            removeList(id)
                                .unwrap()
                                .then(() => {
                                    reloadLists();
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
