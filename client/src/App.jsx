import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { dataTest } from "./axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
   const editor = useRef(null);
   const [image, setImage] = useState("");
   const [data, setData] = useState(false);
   const [scale, setScale] = useState(1.08);

   const submitHandle = async (e) => {
      e.preventDefault();

      if (editor) {
         const canvasScaled = editor.current.getImageScaledToCanvas();
         const imageData = canvasScaled.toDataURL();

         const imgData = {
            imageData: imageData,
            name: image.name,
            type: image.type,
            size: image.size,
         };
         dataTest({ imgData: imgData })
            .then((result) => {
               toast.success(result.data.message);
               console.log(result.data);
               setData(result.data.imgData);
            })
            .catch((err) => toast.error(err.message));
      }
   };
   return (
      <>
         <div className='h-full flex justify-center items-center gap-10'>
            <form onSubmit={submitHandle} className=''>
               {image && (
                  <div className=''>
                     <Dropzone
                        onDrop={(dropped) => setImage(dropped[0])}
                        noClick
                        noKeyboard>
                        {({ getRootProps, getInputProps }) => (
                           <div className='relative' {...getRootProps()}>
                              <AvatarEditor
                                 ref={editor}
                                 width={809}
                                 height={510}
                                 color={[255, 255, 255, 0.6]}
                                 scale={scale}
                                 image={image}
                                 border={0}
                              />
                              <div className='absolute w-full h-full inset-0 pointer-events-none'>
                                 <svg
                                    className='w-full h-full absolute inset-0'
                                    viewBox='0 0 1065 678'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                       d='M52 171.327H326.221'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <line
                                       x1='52'
                                       y1='217.429'
                                       x2='326.221'
                                       y2='217.429'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M327 170V218.429'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M52 170V218.429'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <line
                                       x1='358.658'
                                       y1='275.654'
                                       x2='608.782'
                                       y2='275.654'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358.658 320.438H608.782'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M608.782 274V321.765'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358 274V321.765'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358.657 346.327H608.343'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <line
                                       x1='358.657'
                                       y1='391.102'
                                       x2='608.343'
                                       y2='391.102'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M609 345V392.102'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358 345V392.102'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358 420.327L561.374 420.957'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <line
                                       x1='359.252'
                                       y1='462.448'
                                       x2='562'
                                       y2='462.448'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M562 420V463.448'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358.626 419V463.448'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358.609 494.327H561.391'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358.609 539.438H561.391'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M562 493.324V540.441'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358 493.321V540.437'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358.825 563.654H562.048'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358.5 607.775H563'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M562.048 562.667V608.438'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                    <path
                                       d='M358 562.656V608.781'
                                       stroke='black'
                                       strokeWidth='2'
                                    />
                                 </svg>
                              </div>
                           </div>
                        )}
                     </Dropzone>
                  </div>
               )}
               <div
                  style={
                     image ? {} : { borderTop: "1px solid #222", borderRadius: "3px" }
                  }
                  className='flex p-2 justify-between bg-[#4169e1] border-b border-[#222] border-x rounded-b gap-5'>
                  <div className='flex items-center'>
                     <label className='px-4 rounded py-1 bg-white' htmlFor='inputFile'>
                        Chose File
                     </label>
                     <input
                        className='hidden'
                        id='inputFile'
                        onChange={(e) => {
                           setImage(e.target.files[0]);
                        }}
                        type='file'
                     />
                  </div>
                  <input
                     type='range'
                     min={40}
                     defaultValue={52}
                     max={100}
                     onChange={(e) => {
                        setScale(e.target.value / 50);
                     }}
                  />
                  <button className='px-4 rounded py-1 bg-white' type='submit'>
                     Send
                  </button>
               </div>
            </form>
            {data && (
               <ul className='flex flex-col p-5 rounded text-white gap-2'>
                  <li className='flex gap-2 px-2 justify-between rounded-sm py-1 bg-indigo-500'>
                     <span>İsim:</span>
                     <span className='bg-pink-500 px-2 rounded-sm'>{data.ad}</span>
                  </li>
                  <li className='flex gap-2 px-2 justify-between rounded-sm py-1 bg-indigo-500'>
                     <span>Soyad:</span>
                     <span className='bg-pink-500 px-2 rounded-sm'>{data.soyad}</span>
                  </li>
                  <li className='flex gap-2 px-2 justify-between rounded-sm py-1 bg-indigo-500'>
                     <span>Doğum Yılı:</span>
                     <span className='bg-pink-500 px-2 rounded-sm'>{data.dogumYili}</span>
                  </li>
                  <li className='flex gap-2 px-2 justify-between rounded-sm py-1 bg-indigo-500'>
                     <span>TC No:</span>
                     <span className='bg-pink-500 px-2 rounded-sm'>{data.tcno}</span>
                  </li>
                  <li className='flex gap-2 px-2 justify-between rounded-sm py-1 bg-indigo-500'>
                     <span>Seri No:</span>
                     <span className='bg-pink-500 px-2 rounded-sm'>{data.seriNo}</span>
                  </li>
                  <li className='flex gap-2 px-2 justify-between rounded-sm py-1 bg-indigo-500'>
                     <span>Son Geçerlilik:</span>
                     <span className='bg-pink-500 px-2 rounded-sm'>
                        {data.sonGecerlilik}
                     </span>
                  </li>
               </ul>
            )}
         </div>
         <Toaster position='top-left' reverseOrder={false} />
      </>
   );
}

export default App;
