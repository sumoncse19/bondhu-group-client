import React from "react";
interface WalletData {
  purchase_wallet: number;
  income_wallet: number;
  reference_bonus: number;
}
interface TeamViewData {
  _id: string;
  reference_id: string;
  picture: string;
  parent_placement_id: string;
  name: string;
  email: string;
  left_side_partner: TeamViewData | null;
  right_side_partner: TeamViewData | null;
  wallet: WalletData | null;
}

interface TreeModalProps {
  treeModal: {
    open: boolean;
    value: {
      _id: string;
      name: string;
      user_name: string;
      phone: string;
      registration_date: string;
      accountable: {
        total_carry: number;
        total_point: number;
      };
      wallet: WalletData;
    };
  };
  setTreeModal: React.Dispatch<
    React.SetStateAction<{ open: boolean; value: Object }>
  >;
  fetchTeamViews: (id: string) => void;
}
// : React.FC<TreeModalProps>
const TreeModal: React.FC<TreeModalProps> = ({
  treeModal,
  setTreeModal,
  fetchTeamViews,
}) => {
  console.log(treeModal.value.name, setTreeModal);

  const userData = [
    {
      id: "1",
      key: "Name",
      value: treeModal?.value?.name,
    },
    {
      id: "1111",
      key: "_id",
      value: treeModal?.value?._id,
    },
    {
      id: "2",
      key: "username",
      value: treeModal?.value?.user_name || "--",
    },
    {
      id: "3",
      key: "Phone",
      value: treeModal?.value?.phone || "--",
    },
    {
      id: "4",
      key: "Joined",
      value: treeModal?.value?.registration_date || "--",
    },
    {
      id: "5",
      key: "Team A Member",
      value: "--",
    },
    {
      id: "6",
      key: "Team B Member",
      value: "--",
    },
    {
      id: "7",
      key: "Total Member",
      value: "--",
    },
    {
      id: "8",
      key: "Team A Point",
      value: "--",
    },
    {
      id: "9",
      key: "Team B Point",
      value: "--",
    },
    {
      id: "91",
      key: "Total Point",
      value: treeModal?.value?.accountable?.total_point || "--",
    },
    {
      id: "10",
      key: "Team A Carry Point",
      value: "--",
    },
    {
      id: "11",
      key: "Team B Carry Point",
      value: "--",
    },
    {
      id: "111",
      key: "Total Carry",
      value: treeModal?.value?.accountable?.total_carry || "--",
    },
    {
      id: "12",
      key: "Purchase Wallet",
      value: treeModal?.value?.wallet?.purchase_wallet || "--",
    },
    {
      id: "13",
      key: "Income Wallet",
      value: treeModal?.value?.wallet?.income_wallet || "--",
    },
    {
      id: "12",
      key: "Reference Bonus",
      value: treeModal?.value?.wallet?.reference_bonus || "--",
    },
    // {
    //   id: "12",
    //   key: "My Point",
    //   value: "10000",
    // },
  ];

  console.log(treeModal?.value, "id from tree");

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setTreeModal({ open: false, value: {} });
        }
      }}
      className="w-full min-h-screen overflow-y-auto bg-black bg-opacity-80 absolute top-0 right-0 flex justify-center items-center cursor-pointer z-[40000]"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="h-fit rounded my-3"
      >
        {/* head */}
        {/* <div className="py-4 px-6 flex justify-between items-center rounded bg-gray-300 text-black">
          <p>Send Purchase Wallter</p>
          
        </div> */}
        {/* <div className="flex justify-end mb-3">
          <p
            onClick={() => setTreeModal({ open: false, value: {} })}
            className="bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in px-3 py-1 rounded-md cursor-pointer text-white"
          >
            Close
          </p>
        </div> */}
        {/* body */}
        <div className=" h-full w-[60vw] bg-white px-5 py-5 my-10 flex items-center text-sm">
          {/* images */}
          <div className="w-[30%]  flex justify-center items-center">
            <img
              src="/images/profilePicIcon.png"
              className="w-40 h-40"
              alt=""
            />
          </div>
          {/* others info */}
          <div className="w-[70%]">
            <div className=" border border-black">
              {userData?.map((user) => (
                <div
                  key={user?.id}
                  className="flex items-center pb-2 border-b border-slate-500"
                >
                  <div className="w-full text-center py-1">{user?.key}</div>
                  <div className="w-full text-center py-1"> {user?.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-end">
              <p
                onClick={() => {
                  setTreeModal({ open: false, value: {} });
                  fetchTeamViews(treeModal?.value?._id);
                }}
                className="bg-red-500 text-white font-bold cursor-pointer px-5 py-1 rounded-md"
              >
                View Tree
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeModal;
