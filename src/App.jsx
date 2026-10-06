import { useEffect, useState } from 'react';

function File({ file, margin }) {
    return (
        <div style={{ marginLeft: `${margin}px` }} className='flex gap-10 p-2'>
            <div className='flex gap-1'>
                <img className='w-5' src='public/file.png' />
                <p>{file.name}</p>
            </div>
            <div className='hidden items-center gap-2'>
                <img className='w-4 h-4' src='public/pencil.png' />
                <img className='w-4 h-4' src='public/trash.png' />
            </div>
        </div>
    )
}

function Direcotry({ dir, margin, handleOpenClose }) {
    return (
        <div style={{ marginLeft: `${margin}px` }} className='flex justify-between p-2'>
            <div onClick={() => handleOpenClose(dir.id)} className='flex items-center gap-2'>
                {dir.state ? <img className='w-5' src='public/open-folder.png' /> : <img className='w-5' src='public/folder-closed-black-shape.png' />}
                <p>{dir.name}</p>
            </div>
            <div className='flex'>
            </div>
        </div>
    )
}

export default function App() {
    const [filesList, setFilesList] = useState([{
        id: crypto.randomUUID(),
        name: 'root',
        type: 'directory',
        state: false,
        subFiles: [
            {
                id: crypto.randomUUID(),
                name: 'public',
                type: 'directory',
                state: false,
                subFiles: []
            },
            {
                id: crypto.randomUUID(),
                name: 'src',
                state: false,
                type: 'directory',
                subFiles: [
                    {
                        id: crypto.randomUUID(),
                        name: 'package.json',
                        type: 'file',
                    },
                    {
                        id: crypto.randomUUID(),
                        name: 'package-lock.json',
                        type: 'file',
                    }
                ]
            }
        ]
    },]);

    function changeState(list, uid) {
        for (const d of list) {
            if (d.type == 'directory') {
                if (d.id == uid) {
                    d.state = !d.state;
                    return;
                }
                changeState(d.subFiles, uid)
            }
        }
    }

    function handleOpenClose(uid) {
        const newList = [...filesList];
        changeState(newList, uid);
        setFilesList(newList);
    }

    let render = [];
    function show(file, margin) {
        for (const f of file) {
            if (f.type == 'file') render.push(<File file={f} margin={margin} />)
            else {
                render.push(<Direcotry handleOpenClose={handleOpenClose} dir={f} margin={margin} />);
                if (f.state) show(f.subFiles, margin + 40)
            }
        }
    }
    show(filesList, 0);

    return (
        <>
            <div className='flex justify-center p-3 text-3xl font-bold shadow-lg'>File Explorer</div>
            <div className='flex flex-col w-screen px-20 pt-10'>
                {render}
            </div >
        </>
    )
}
