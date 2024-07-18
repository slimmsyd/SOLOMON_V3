import Image from "next/image";

const ImageComponent = ({ url }: { url: string }) => {
  let imageURl =
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-p9zhKChrny6pk3hwy8kfT8sg/user-VFcZc9gBCbwvsFI4dOqvBmxG/img-QbgZIWmOC6O0HfcjaHnmg6qL.png?st=2024-07-18T17%3A35%3A22Z&se=2024-07-18T19%3A35%3A22Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-18T13%3A58%3A40Z&ske=2024-07-19T13%3A58%3A40Z&sks=b&skv=2023-11-03&sig=LptkVYoP8L4YUWvECjN68fKjq4d2%2BseJZrq1j1uR1qE%3D";

  return (
    <div>
      <Image
        src={url}
        alt="Generated Image"
        width={500} // Replace with actual width of the image
        height={500} // Replace with actual height of the image
        style={{ objectFit: "cover" }} // Adjust this if needed
      />
    </div>
  );
};

export default ImageComponent;
 