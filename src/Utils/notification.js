import { toast } from 'react-toastify';
function showSuccess(msg) {
    return toast.success(msg);
}

function showInfo(msg) {
    return toast.info(msg);
}

function showWarnings(msg) {
    return toast.warn(msg);
}

function handleError(error) {
    // debugger;
    const err = error.response;
    let errMsg;
    // 
    if (err && err.data) {
        errMsg = err.data.msg;
    }
    
    _error(errMsg);

    // error handling function
    // 1. check what comes in
    // 2. parse appropriate error message
    // 3.show them in UI using toastr
}

function _error(msg) {
    toast.error(msg);
}

export default {
    showSuccess,
    showInfo,
    showWarnings,
    handleError
}
