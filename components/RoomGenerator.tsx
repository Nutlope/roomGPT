import Image from "next/image";

export function RoomGeneration({
  original,
  generated,
}: {
  original: string;
  generated: string;
}) {
  return (
    <div className="flex flex-col space-y-10 mt-4 mb-4 border px-8 pb-8 pt-2 border-gray-600 rounded-xl">
      <div className="flex sm:space-x-8 sm:flex-row flex-col pb-5">
        <div>
          <h3 className="mb-1 font-medium text-lg">Original</h3>
          <Image
            alt="Original room"
            src={original}
            className="rounded-2xl h-full"
            width={400}
            height={400}
          />
        </div>
        <div className="sm:mt-0 mt-8">
          <h3 className="mb-1 font-medium text-lg">Generated</h3>
          <Image
            alt="Generated room"
            width={400}
            height={400}
            src={generated}
            className="rounded-2xl h-full sm:mt-0 mt-2"
          />
        </div>
      </div>
    </div>
  );
}
