import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface IProps {
    control: Control<any, any>;
    label?: string;
    inputName: string;
    inputType?: string;
    error?: string;
    children?: React.ReactNode; // Accept children
}

const InputField: React.FC<IProps> = ({ control, label, inputName, inputType = 'text', error, children }) => {
    const renderTopRow = () => {
        if (error) {
            return <span className='text-red-600 font-semibold'>{error}</span>;
        }
        if (label) {
            return <span className='font-semibold'>{label}</span>;
        }
        return null;
    };

    const dynamicClassName = error ? 'border-red-500 rounded-lg' : 'border-[#754eb477]';

    return (
        <div className='px-4 my-2 w-3/4'>
            {renderTopRow()}
            <Controller
                name={inputName}
                control={control}
                render={({ field }) => (
                    <input {...field} autoComplete='on' type={inputType} className={`form-input text-black ${dynamicClassName}`} />
                )}
            />
            {children} {/* Render children if provided */}
        </div>
    );
};

export default InputField;
