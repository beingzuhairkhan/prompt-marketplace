import React, { useState, ChangeEvent, DragEvent,useEffect } from 'react';
import { styles } from '@/utils/styles';
import { Input, Selection, Textarea, Select, SelectItem, Button } from '@nextui-org/react'
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image'
import { IoDocumentAttachOutline } from 'react-icons/io5';
import axios from 'axios';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { SharedSelection } from '@nextui-org/react';

type promptData = {
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  attachments: string[];
  estimatedPrice: string;
  price: string;
  tags: string
}

const categoryItem = [
  {
    title: "Chatgpt",
  },
  {
    title: "MidJourney",
  },
  {
    title: "Bard",
  },
  {
    title: "Dalle",
  }
]

const UploadPrompt = () => {
  const [promptData, setPromptData] = useState<promptData>({
    name: "",
    shortDescription: "",
    description: "",
    images: [],
    attachments: [],
    estimatedPrice: "",
    price: "",
    tags: ""
  })
  const [isClient, setIsClient] = useState(false);
  const [dragging, setDragging] = useState<Boolean>(false)
  const { userId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  // const [category, setCategory] = useState<Selection>(new Set([]))
  // const [category, setCategory] = useState<Set<string>>(new Set([]));
  const [category, setCategory] = useState<SharedSelection>(new Set());

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              images: [...prevData.images, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAttachmentFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              attachments: [...prevData.attachments, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

   const handleImageDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              images: [...prevData.images, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAttachmentDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              attachments: [...prevData.attachments, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    const categoryString = Array.from(category).join(",");
    await axios.post("/api/upload-prompt", {
      ...promptData, category: categoryString, sellerId: userId
    }).then((res) => {
      setIsLoading(false)
      toast.success("Prompt Uploaded SUccessfully")
      setPromptData({
        name: "",
        shortDescription: "",
        description: "",
        images: [],
        attachments: [],
        estimatedPrice: "",
        price: "",
        tags: ""
      });
      redirect("/shop/prompts")
    }).catch((error)=>{
      setIsLoading(false)
      console.log("upload prompt error" , error)
      toast.error(error.data.message || "failed to Upload Prompt")
    })

  };

  const handleSelectionChange = (keys:SharedSelection) => {
    setCategory(keys); // Ensure keys are passed as Set<string>
  };
  useEffect(() => {
    setIsClient(true); // Ensure it's a client-side render
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // Prevents rendering mismatch during SSR
  }


  return (
    <div>
      <h1 className={`${styles.heading} text-center py-5 mt-5 `} >
        Upload Your Prompt
      </h1>
      <br />
      <form className="w-[90%] m-auto  " onSubmit={handleSubmit} >
        <Input type="text" label="Title" value={promptData.name} onChange={(e) => setPromptData({ ...promptData, name: e.target.value })}
          variant="bordered" required placeholder="Enter your Prompt title"
        />
        <br />
        <Input type="text" label="ShortDescription" value={promptData.shortDescription} onChange={(e) => setPromptData({ ...promptData, shortDescription: e.target.value })}
          variant="bordered" required placeholder="Enter your shortDescription for prompt"
        />
        <br />
        <Textarea required placeholder="Write a description for your Prompt" value={promptData.description} variant="bordered"
          onChange={(e) => setPromptData({ ...promptData, description: e.target.value })}
          size="lg"
        />
        <br />
        <div className="md:flex md:w-full md:mb-3 gap-4 ">

          <Input
            type="number"
            label="Prompt Estimated Price"
            value={promptData.estimatedPrice}
            onChange={(e) => setPromptData({ ...promptData, estimatedPrice: e.target.value })}
            variant="bordered"
            required
            placeholder="Rs. 2999"
            className="w-full mb-4 "
          />


          <Input
            type="number"
            label="Prompt Price *"
            value={promptData.price}
            onChange={(e) => setPromptData({ ...promptData, price: e.target.value })}
            variant="bordered"
            required
            placeholder="Rs. 1999"
            className="w-full mb-4"
          />

        </div>
        <div className="md:flex md:w-full md:mb-3 gap-4">
      <Select
        label="Choose one category"
        variant="bordered"
        placeholder="Select one category"
        selectedKeys={category}
        onSelectionChange={handleSelectionChange}
        className="max-w-xs"
      >
        {categoryItem.map((item, index) => (
          <SelectItem key={index} value={item.title} className="text-black">
            {item.title}
          </SelectItem>
        ))}
      </Select>
      <Input
        type="text"
        label="Prompt tags *"
        value={promptData.tags}
        onChange={(e) =>
          setPromptData({ ...promptData, tags: e.target.value })
        }
        variant="bordered"
        required
        placeholder="AI Photo Arts"
        className="mt-4 md:mt-0"
      />
    </div>
        <div className="w-full mt-8" >
          <Input type="file" required accept="image/*" multiple id="file" className="hidden" onChange={handleImageFileChange} />
          <label htmlFor="file" className={`w-full rounded-md min-h-[15vh] border-white p-3 border flex items-center justify-center ${dragging ? "bg-gray-800" : "bg-transparent"} `}
            onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleImageDrop}
          >
            {
              promptData.images.length !== 0 ? (

                <div className="w-full flex flex-wrap" >
                  {promptData.images.map((item, i) => (
                    <Image src={item} key={i} alt="" width={500} height={400} className="w-full md:w-[48%]  object-cover md:m-2 my-2 " />
                  ))}
                </div>
              ) : (
                <span className="text-white" >Drag and Drop Images here or click to browse</span>
              )
            }

          </label>
        </div>
        <br />
        <br />
        <div className="w-full" >
          <Input type="file" required accept=".txt , .pdf" multiple id="attachment" className="hidden" onChange={handleAttachmentFileChange} />
          <label htmlFor="attachment" className={`w-full rounded-md min-h-[15vh] border-white p-3 border flex items-center justify-center ${dragging ? "bg-gray-800" : "bg-transparent"} `}
            onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleAttachmentDrop}
          >
            {
              promptData.attachments.length !== 0 ? (

                <div className="flex items-center" >
                  <IoDocumentAttachOutline className="text-3xl" />
                  <span className={`${styles.label} pl-2 !text-2xl pt-1`} >
                    {promptData?.attachments?.length}{" "}
                    {promptData?.attachments?.length > 1 ? "files" : "file"}
                  </span>
                </div>
              ) : (
                <span className="text-white" >Drag and Drop prompt file here or click to browse</span>
              )
            }

          </label>
          <br />
          <br />
          <div className="w-full flex items-center justify-between" >
            <Button color="primary" className={`${styles.button}`} type="submit" disabled={isLoading} disableAnimation={isLoading} >
              Upload Your Prompt
            </Button>
            <br />
            <br />

          </div>
        </div>



      </form>
    </div>
  );
};

export default UploadPrompt;
