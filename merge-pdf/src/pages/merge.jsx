import PDFMerger from 'pdf-merger-js';
import { useRef, useState } from 'react';
import { FaFilePdf, FaTrash } from "react-icons/fa";
import { FcRemoveImage } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Merge() {
    const [files, setFiles] = useState([]);
    const [fileMerged, setFilesMerged] = useState("");
    const fileRef = useRef(null);
    const navigate = useNavigate();

    async function mergePdf() {
        try {
            let merger = new PDFMerger();
            for (const file of files) {
                await merger.add(file.blob);
            }
            await merger.setMetadata({
                producer: "pdf-merger-js based script"
            });
            const mergedPdf = await merger.saveAsBlob();
            const url = URL.createObjectURL(mergedPdf);
            return setFilesMerged(url);
        } catch (e) {
            console.log("ERROR TO MERGE FILES", e);
        }
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (event.target.files.length > 1) {
            toast.error("Um único arquivo deve ser selecionado.")
        } else if (event.target.files.length === 0) {
            toast.error("Nenhum arquivo selecionado.")
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileObj = {
                    name: file.name,
                    blob: e.target.result
                }
                setFiles([...files, fileObj]);
            };
            reader.readAsDataURL(file);
            toast.success("Arquivo adicionado com sucesso.")
        }
    };

    function removeArchive(index) {
        const newItems = [...files];
        newItems.splice(index, 1);
        console.log(newItems)
        setFiles([...newItems]);
        toast.success("Arquivo removido com sucesso.")
    }

    return (
        <div className='d-flex flex-wrap h-100'>
            <div className='col'>
                {fileMerged ?
                    <iframe
                        height={'99%'}
                        src={`${fileMerged}`}
                        title='pdf-viewer'
                        width='100%'
                    />
                    :
                    <div className='col-12 text-center' style={{ marginTop: '20%' }}>
                        <FcRemoveImage size={'150'} />
                        <br />
                        Necessário selecionar arquivos PDF e clicar em "Juntar arquivos"
                    </div>
                }
            </div>

            <div className='col-3 pt-5 bg-primary text-white h-100'>
                <div className='btn-group col-3 mb-2' style={{ position: "absolute", top: "0" }}>
                    <button onClick={()=>navigate("/")} className='btn btn-light rounded-0'>Voltar</button>
                </div>

                <div className='d-flex flex-wrap col-12'>
                    <div className='col-6 p-2'>
                        <div className='col-12 btn text-white border' onClick={() => { fileRef.current.click() }} style={{ background: 'rgb(111 187 255)' }}>
                            <FaFilePdf className='text-danger mb-2' size={80} />
                            <div>Adicionar</div>
                            <div>arquivo</div>
                        </div>
                    </div>
                    <input ref={fileRef} type='file' accept='.pdf' onChange={handleFileUpload} multiple={false} className='d-none' />

                    {files.map((fileCurrent, i) => {
                        return (
                            <div className='col-6 p-2' key={i.toString()}>
                                <div className='col-12 btn text-white border' style={{ background: 'rgb(111 187 255)' }}>
                                    <FaFilePdf className='text-danger mb-2' size={80} />
                                    <label style={{
                                        display: '-webkit-box',
                                        "WebkitLineClamp": '2',
                                        "WebkitBoxOrient": "vertical",
                                        overflow: 'hidden',
                                        "textOverflow": 'ellipsis'
                                    }}>{fileCurrent.name}</label>
                                    <button className='btn' onClick={() => removeArchive(i)}>
                                        Retiar arquivo<FaTrash />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='btn-group col-3 mb-2' style={{ position: "absolute", bottom: "0" }}>
                    <button onClick={mergePdf} className='btn btn-light rounded-0'>Juntar arquivos</button>
                </div>
            </div>
        </div>
    )
}