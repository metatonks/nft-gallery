import { useState } from 'react'
import { NFTCard } from '/components/nftCard.jsx'
import ReactPaginate from 'react-paginate';

const Home = () => {
  //const ALCHEMY_API_KEY = process.env.API_KEY;
  const ALCHEMY_API_KEY = "SET_YOUR_ALCHEMY_API_KEY";

  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection]=useState(false);

  const [page, setPage] = useState(0);
  const nftsPerPage = 9;
  const numberOfRecordsVisted = page * nftsPerPage;

  const totalPages = Math.ceil(NFTs.length / nftsPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const displayNFTS = NFTs.slice(
    numberOfRecordsVisted,
    numberOfRecordsVisted + nftsPerPage
  )
  .map((nft) => {
    return (
      <NFTCard nft={nft}></NFTCard>
    );
  });

  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
    
      const fetchURL = `${baseURL}?owner=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())

      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            }else fetchNFTs()
          }
        }>Let's go! </button>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName={"navigationButtons"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"navigationDisabled"}
          activeClassName={"navigationActive"}
        />
        <p></p><p></p>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>{displayNFTS}</div>
    </div>
  )
}

export default Home