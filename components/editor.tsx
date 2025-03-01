'use client'

import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/plugins/save.min.js'
import dynamic from 'next/dynamic'
import { FC, useState } from 'react'
const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
    ssr: false,
})

type EditorProps = {
    model: string
    onModelChange: (model: string) => void
}

const Editor: FC<EditorProps> = ({ model, onModelChange }) => {
    const [editorModel, setEditorModel] = useState(model)

    // Save editor content to localStorage whenever it changes
    const handleModelChange = (newModel: string) => {
        setEditorModel(newModel)
        onModelChange(newModel)
    }

    return (
        <FroalaEditor model={editorModel} onModelChange={handleModelChange} />
    )
}

export default Editor
