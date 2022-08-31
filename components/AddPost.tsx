import { SanityAssetDocument } from "@sanity/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BASE_URL } from "../utils";
import { client } from "../utils/client";
import useAuthStore from "./../store/authStore";

function AddPost({ toggleModal, title }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [savingPost, setSavingPost] = useState(false);
  const [imageAsset, setImageAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  function uploadImage(e: any) {
    const selectedFile = e.target.files[0];
    const fileTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setImageAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  }

  const handlePost = async () => {
    if (caption && imageAsset?._id) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        image: {
          _type: "file",
          asset: {
            _ref: imageAsset?._id,
            _type: "reference",
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
      };

      await axios.post(`${BASE_URL}/api/post`, document);

      router.push("/");
    }
  };

  return (
    <div className="w-full  h-full bg-[rgba(0,0,0,0.5)] absolute left-0 z-50">
      <h2
        className="text-white relative float-right mr-5 mt-4 cursor-pointer"
        onClick={toggleModal}
      >
        close
      </h2>
      <div className="w-10/12 md:w-2/5 bg-white m-auto p-[31px] mt-[68px] rounded-sm">
        <h2 className=" m-auto font-medium text-2xl text-center">{title}</h2>
        {imageAsset ? (
          <form onSubmit={handlePost} className="mt-3 w-full">
            <Image src={imageAsset.url} alt="post" width={550} height={550} />
            <input
              type="text"
              className="w-full md:w-[10/12] p-3 mt-3 border border-gray-500 rounded placeholder-gray-500"
              placeholder="Caption..."
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            />
          </form>
        ) : (
          <label className="cursor-pointer">
            <div className="w-1/2 h-[200px] text-lg m-auto mt-20">
              <p className="font-bold text-xl flex justify-center items-center">
                <FaCloudUploadAlt className="text-gray-400 text-9xl" />
              </p>
            </div>
            <input
              type="file"
              name="upload-image"
              onChange={uploadImage}
              className="w-0 h-0"
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default AddPost;
