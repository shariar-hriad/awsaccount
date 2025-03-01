'use client'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import dynamic from 'next/dynamic'
import { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface QuillEditorProps extends ReactQuillProps {
    value: string
    onChange: (value: string) => void
    // imageUploadHandler?: (file: File) => Promise<string>
}

const QuillEditor = ({
    value,
    onChange,
}: // imageUploadHandler,
QuillEditorProps) => {
    // const quillRef = useRef<ReactQuill>(null)

    // const modules = useMemo(
    //     () => ({
    //         toolbar: {
    //             container: [
    //                 [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //                 ['bold', 'italic', 'underline', 'strike'],
    //                 [{ color: [] }, { background: [] }],
    //                 [{ list: 'ordered' }, { list: 'bullet' }],
    //                 [{ align: [] }],
    //                 ['link', 'image', 'video'],
    //                 ['clean'],
    //             ],
    //             handlers: {
    //                 image: () => handleImageClick(),
    //             },
    //         },
    //     }),
    //     []
    // )

    // const handleImageClick = () => {
    //     const input = document.createElement('input')
    //     input.setAttribute('type', 'file')
    //     input.setAttribute('accept', 'image/*')
    //     input.click()

    //     input.onchange = async () => {
    //         const file = input.files?.[0]
    //         if (!file) return

    //         try {
    //             const imageUrl = await imageUploadHandler(file)
    //             insertImage(imageUrl)
    //         } catch (error) {
    //             console.error('Image upload failed:', error)
    //         }
    //     }
    // }

    // const insertImage = (url: string) => {
    //     const quill = quillRef.current?.getEditor()
    //     const range = quill?.getSelection()
    //     if (range) {
    //         quill?.insertEmbed(range.index, 'image', url)
    //         quill?.setSelection(range.index + 1)
    //     }
    // }

    return <ReactQuill value={value} onChange={onChange} />
}

QuillEditor.displayName = 'QuillEditor'

export default QuillEditor
