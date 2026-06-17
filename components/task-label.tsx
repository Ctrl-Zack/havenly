'use client';

// Asset imports
const imgSubtract = "https://www.figma.com/api/mcp/asset/0a1aa9cb-81cb-4c3f-b7ee-61ba8b22d717";
const imgVector9 = "https://www.figma.com/api/mcp/asset/d50905b4-bbef-4e53-ad32-b21d996ca1bc";
const imgVector = "https://www.figma.com/api/mcp/asset/32c63a94-7391-4861-9882-0d77f2ee5442";
const imgSubtract1 = "https://www.figma.com/api/mcp/asset/fdcbb2b1-131b-4e18-bb78-4d98004c6fb7";
const imgGroup21 = "https://www.figma.com/api/mcp/asset/4d8b9ddc-1382-40ae-ad1f-00f858d1234f";
const imgEllipse45 = "https://www.figma.com/api/mcp/asset/b790a0be-dc01-452f-aa71-25961aaf6495";

// ============================================
// VARIANT 1: TextLabel
// ============================================
type TextLabelProps = {
  className?: string;
  label?: string;
  task?: string;
};

export function TextLabel({
  className,
  label = "Current Task",
  task = "Open the Document",
}: TextLabelProps) {
  return (
    <div className={className || "content-stretch flex flex-col items-center justify-center relative w-[368px] min-w-[270px]"}>
      <div className="border-2 border-black border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[24px] shrink-0 w-full min-w-[170px]">
        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Poppins:SemiBold'] justify-center leading-[30px] max-w-[320px] min-w-px not-italic relative text-[#151515] text-[24px] text-center">
          {task}
        </div>
      </div>
      <div className="absolute bg-[#fcfee8] content-stretch flex items-center left-[20px] px-[4px] top-[-10px]">
        <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular'] justify-center leading-[16px] not-italic relative shrink-0 text-[#151515] text-[12px] whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  );
}

// ============================================
// VARIANT 2: Dropdown
// ============================================
type DropdownProps = {
  className?: string;
  label?: string;
  task?: string;
  onDropdownClick?: () => void;
};

export function Dropdown({
  className,
  label = "Current Task",
  task = "Open the Document",
  onDropdownClick,
}: DropdownProps) {
  return (
    <div className={className || "content-stretch flex flex-col items-center justify-center relative w-[368px]"}>
      <div className="border-2 border-black border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[24px] shrink-0 w-full gap-[10px]">
        {/* Clock Icon */}
        <div className="relative shrink-0 size-[24px]">
          <div className="absolute inset-[12.5%]">
            <img alt="Time" className="absolute block inset-0 max-w-none size-full" src={imgSubtract} />
          </div>
        </div>

        {/* Task Text */}
        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Poppins:Regular'] justify-center leading-[18px] min-w-px not-italic relative text-[#151515] text-[14px]">
          {task}
        </div>

        {/* Dropdown Icon
        <button
          onClick={onDropdownClick}
          className="relative shrink-0 size-[24px] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]">
            <div className="flex items-center justify-center -scale-x-100 h-full">
              <img alt="Dropdown" className="block max-w-none" src={imgVector9} />
            </div>
          </div>
        </button> */}
      </div>

      {/* Label */}
      <div className="absolute bg-[#fcfee8] content-stretch flex items-center left-[20px] px-[4px] top-[-10px]">
        <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular'] justify-center leading-[16px] not-italic relative shrink-0 text-[#151515] text-[12px] whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  );
}

// ============================================
// VARIANT 3: EditLabel
// ============================================
type EditLabelProps = {
  className?: string;
  task?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function EditLabel({
  className,
  task = "Open the Document",
  onEdit,
  onDelete,
}: EditLabelProps) {
  return (
    <div className={className || "content-stretch flex flex-col items-center justify-center relative w-[368px]"}>
      <div className="border-2 border-black border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[24px] shrink-0 w-full gap-[10px]">
        {/* Drag Handle Icon */}
        <div className="overflow-clip relative shrink-0 size-[24px]">
          <div className="absolute inset-[16.67%_33.33%]">
            <img alt="Drag" className="block max-w-none size-full" src={imgVector} />
          </div>
        </div>

        {/* Task Text */}
        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Poppins:Regular'] justify-center leading-[18px] min-w-px not-italic relative text-[#151515] text-[14px]">
          {task}
        </div>

        {/* Edit Icon */}
        <button
          onClick={onEdit}
          className="relative shrink-0 size-[24px] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <div className="absolute inset-[15.95%_15.95%_12.85%_12.85%]">
            <img alt="Edit" className="absolute block inset-0 max-w-none size-full" src={imgSubtract1} />
          </div>
        </button>

        {/* Delete/Trash Icon */}
        {/* <button
          onClick={onDelete}
          className="relative shrink-0 size-[24px] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <div className="absolute bottom-[12.5%] left-[12.5%] right-[12.5%] top-1/4">
            <img alt="Trash" className="absolute block inset-0 max-w-none size-full" src={imgGroup21} />
          </div>
          <div className="absolute flex inset-[12.5%_41.67%_83.33%_41.67%] items-center justify-center">
            <img alt="" className="block max-w-none" src={imgEllipse45} />
          </div>
        </button> */}
      </div>
    </div>
  );
}