import Container from 'quill/blots/container';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

type props = {
    content: string,
    setContent?: React.Dispatch<React.SetStateAction<string>>,
    readOnly: boolean
}

const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6] }],
    [{ size: ['small', 'large', 'huge'] }],
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike', 'link'],
    ['image'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    ['code-block', 'blockquote'],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
]


const Editor = ({ content, setContent, readOnly }: props) => {

    return (
        <ReactQuill
            value={content}
            theme={`${readOnly ? 'bubble' : 'snow'}`}
            placeholder={`${readOnly ? '' : 'Enter your Content Here'}`}
            modules={{
                toolbar: toolbarOptions
            }}
            onChange={setContent}
            readOnly={readOnly}
        />
    )
}


export default Editor;