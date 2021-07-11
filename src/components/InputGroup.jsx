const InputGroup = ({id, label, name, placeholder, type, value, onChange}) => {

    const handleOnChange = (e) => {
        onChange({
            ...value,
            [name]: e.target.value
        })
    }

    return (
        <div className="flex flex-col py-3 rounded-sm">
            <label className="py-1" htmlFor={id}>{label}</label>
            <input className="border border-b-black px-3 py-2 rounded-sm" value={value[name]} onChange={handleOnChange} id={id} type={type} name={name} placeholder={placeholder} required />
        </div>
    );
};

export default InputGroup;