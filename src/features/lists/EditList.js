import React, { useRef, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Edit from '../../components/AddElement';
import { useUpdateListMutation } from '../../service/listsService';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditList = () => {
    const history = useHistory();
    const [updateList, { isSuccess, error, isError }] = useUpdateListMutation();
    const listEl = useRef('');

    let { list_id } = useParams();
    list_id = Number(list_id);
    const { search } = useLocation();
    const pars = new URLSearchParams(search);
    let list_name;
    if (pars) {
        list_name = pars.get('list_name') ?? '';
    }
    const manageClick = (evt) => {
        evt.preventDefault();
        updateList({ name: listEl.current.value, id: list_id });
    };

    useEffect(() => {
        if (list_name) {
            listEl.current.value = list_name;
        }
        if (isSuccess) {
            history.replace('/lists');
        }
        console.log('response', error, isSuccess, isError);
        if (error) {
            toast.error(error.error);
        }
        return () => {};
    }, [isSuccess, error,history,isError,list_name]);

    return (
        <div>
            <h1>Edit list</h1>
            <Edit
                Ele={listEl}
                txtButton={'Edit list'}
                manageClick={manageClick}
            />
        </div>
    );
};

export default EditList;
