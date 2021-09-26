import List from './List';
import {
    useGetListsQuery,
    useDeleteListMutation,
    useAddListMutation,
} from '../../service/listsService';
import { toast } from 'react-toastify';
import React, { useEffect, useRef } from 'react';
import AddList from '../../components/AddElement';
import FieldError from '../../components/FieldError';

const Lists = () => {
    const listEl = useRef('');
    const {
        data: { data: lists = [] } = {},
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
    const errorValue = typeof error === 'string' ? error : error?.data?.message;
    const errorMessage = errorValue ? [errorValue] : [];
    useEffect(() => {
        if (error) {
            if (typeof error === 'string') {
                toast.error(error);
            } else {
                toast.error(error?.data?.message);
            }
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
            <FieldError errors={errorMessage} />
            <AddList
                Ele={listEl}
                manageClick={manageClick}
                txtButton={'Add list'}
            />
            <ul className='list-group list-group-flush' id='ListList'>
                {lists.map((list) => (
                    <List onRemoveList={removeList} key={list.id} list={list} />
                ))}
            </ul>
        </>
    );
};
export default Lists;
