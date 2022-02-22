import React,{SyntheticEvent, useState} from 'react';

interface EditorProps{
    value: any;
    setValue: (val: any) => void;
}

export default function Editor({value,setValue}:EditorProps) {
    return (<>
            <label>Content:</label>
            <textarea value={value} onChange={ (event)=>setValue(event.target.value) }></textarea>
        </>
    )
}