import { useState, useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
type Props = {
    name: string
}
export default function PictureInput({ name }: Props) {
    const { register, setValue, watch } = useFormContext()
    const [picturePreview, setPicturePreview] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const pictureValue = watch(name);

    // in pictures page if the picture doesn't include the face clear the preview 
    useEffect(() => {
        if (pictureValue === undefined) {
            setPicturePreview("")
        }
    }, [name, pictureValue])
    
    const convertFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files;
        // if user choose a picture show preview and set input value of the file
        if (imageFile && imageFile?.length > 0) {
            // set the img value here
            setValue(name, imageFile[0])
            // create picture path here
            const path = URL.createObjectURL(imageFile[0])
            setPicturePreview(path)
            return
        }
        setPicturePreview('')
        setValue(name, undefined)

    }
    
    return (

        <div className="bg-active picture-input">
            <label className="relative flex items-center justify-center w-full h-full cursor-pointer" >
                <input type="file" className="hidden w-full h-full mx-auto"
                    {...register(name, { required: true })}
                    onChange={convertFile}
                    ref={fileInputRef}
                />
                <FaPlus className="text-xl" />
                {
                    picturePreview &&
                    <div className="absolute top-0 left-0 w-full h-full">
                        <img src={picturePreview} alt={"uploaded picture"} className='object-cover w-full h-full rounded-tl-md' />
                    </div>
                }
            </label>
        </div>
    )
}
