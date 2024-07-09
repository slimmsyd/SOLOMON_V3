import Image from "next/image";


const ImageComponent = () => {
    const imageUrl = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-p9zhKChrny6pk3hwy8kfT8sg/user-VFcZc9gBCbwvsFI4dOqvBmxG/img-v7biCEVYcDBrgHF43xlOpTl9.png?st=2024-07-08T21%3A01%3A22Z&se=2024-07-08T23%3A01%3A22Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-08T17%3A59%3A54Z&ske=2024-07-09T17%3A59%3A54Z&sks=b&skv=2023-11-03&sig=7UwSiJgA5cd8g4UPaNK8SBciniTzQA6A5/TsBNYuTPs%3D';
  
    return (
      <div>
        <Image
          src={imageUrl}
          alt="Generated Image"
          width={500} // Replace with actual width of the image
          height={500} // Replace with actual height of the image
          style={{ objectFit: "cover" }} // Adjust this if needed
        />
      </div>
    );
  };
  
  export default ImageComponent;
  