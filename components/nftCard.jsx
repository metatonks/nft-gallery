import { useState} from 'react'

export const NFTCard = ({ nft }) => {
    
    //Add an icon next to the NFT addresses to make it easy for people viewing your site to copy the contract address.
    //Add a pagination system to view more than 100 NFTs, by using the pageKey parameter from the getNFTs endpoint.
    
    function copy(myTarget) {
        const el = document.createElement('input');
        if(myTarget === "address") {
            el.value = nft.contract.address;
        } else {
            el.value = nft.id.tokenId; 
        }
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      
    return (
        <div className="w-1/4 flex flex-col ">
        <div className="rounded-md">
            <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
            <div className="">
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                <p className="text-gray-600">Id: {`${nft.id.tokenId.substr(0, 4)}...${nft.id.tokenId.substr(nft.id.tokenId.length - 4)}`}<button onClick={(event) => copy('tokenId')}>🗒️​</button></p> 
                <p className="text-gray-600" >{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}<button onClick={(event) => copy('address')}>🗒️​</button></p>
            </div>
            <div className="flex-grow mt-2">
                <p className="text-gray-600">{nft.description?.substr(0, 150)}</p>
            </div>
            <div className="flex justify-center mb-1">
                <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} className="px-2 px-4 bg-blue-500 w-1/2 text-center round-m text-white cursor-pointer">View on etherscan</a>
            </div>
        </div>
    </div>
    )
}