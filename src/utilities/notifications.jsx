import { toast } from 'react-toastify';
import { Check, AlertCircle } from 'lucide-react';

export const notifySuccess = (message) => {
    toast.success(message, {
        icon: <Check size={17} className="text-zinc-400 shrink-0" />,
        hideProgressBar: true,
        autoClose: 3000,
    });
};

export const notifyError = (message) => {
    toast.error(message, {
        icon: <AlertCircle size={20} className="text-zinc-400 shrink-0" />,
        hideProgressBar: true,
        autoClose: 3000,
    });
};