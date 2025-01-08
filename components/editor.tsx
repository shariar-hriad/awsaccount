'use client'

import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/plugins/save.min.js'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
    ssr: false,
})

type EditorProps = {
    model: string
    onModelChange: (model: string) => void
    storageKey: string
}

const Editor: FC<EditorProps> = ({ model, onModelChange, storageKey }) => {
    const [editorModel, setEditorModel] = useState(model)
    // Load saved state from localStorage
    useEffect(() => {
        const savedModel = localStorage.getItem(storageKey)
        if (savedModel) {
            onModelChange(savedModel)
        }
    }, [onModelChange, storageKey])

    // Save editor content to localStorage whenever it changes
    const handleModelChange = (newModel: string) => {
        setEditorModel(newModel)
        localStorage.setItem(storageKey, newModel)
        onModelChange(newModel)
    }

    return (
        <FroalaEditor
            model={editorModel}
            onModelChange={handleModelChange}
            config={{
                saveInterval: 1000,
                events: {
                    'save.before': function (html: string) {
                        localStorage.setItem(storageKey, html)
                    },
                },
            }}
        />
    )
}

export default Editor
