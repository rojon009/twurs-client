const InputGroup = ({id, label, name, placeholder, type, value, onChange}) => {

    const handleOnChange = (e) => {
        onChange({
            ...value,
            [type]: e.target.value
        })
    }

    return (
        <div className="flex flex-col py-3">
            <label className="py-1" htmlFor={id}>{label}</label>
            <input className="border border-b-black px-3 py-2" value={value[type]} onChange={handleOnChange} id={id} type={type} name={name} placeholder={placeholder} required />
        </div>
    );
};

export default InputGroup;