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
        <div className="flex items-center justify-center shrink-0 size-[24px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#151515" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 6V12.25L16.25 15.25L15 17L10.5 13.5V6H12Z" />
          </svg>
        </div>

        {/* Task Text */}
        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Poppins:Regular'] justify-center leading-[18px] min-w-px not-italic relative text-[#151515] text-[14px]">
          {task}
        </div>

        {/* Dropdown Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onDropdownClick?.();
          }}
          className="flex items-center justify-center shrink-0 size-[24px] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
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
// ============================================
// VARIANT 3: EditLabel
// ============================================
type EditLabelProps = {
  className?: string;
  task?: string;
  label?: string;
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onChange?: (val: string) => void;
  onSave?: () => void;
  draggable?: boolean;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  onDragEnter?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDragEnd?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
};

export function EditLabel({
  className,
  task = "Open the Document",
  label,
  isEditing,
  onEdit,
  onDelete,
  onChange,
  onSave,
  draggable,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragEnd,
  onDrop,
}: EditLabelProps) {
  return (
    <div 
      className={className || "content-stretch flex flex-col items-center justify-center relative w-[368px]"}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
    >
      <div className="border-2 border-black border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[24px] shrink-0 w-full gap-[10px] bg-transparent">
        {/* Drag Handle Icon */}
        <div className={`flex items-center justify-center shrink-0 size-[24px] ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#151515" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="5" r="2" />
            <circle cx="9" cy="12" r="2" />
            <circle cx="9" cy="19" r="2" />
            <circle cx="15" cy="5" r="2" />
            <circle cx="15" cy="12" r="2" />
            <circle cx="15" cy="19" r="2" />
          </svg>
        </div>

        {/* Task Text */}
        <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Poppins:Regular'] justify-center leading-[18px] min-w-px not-italic relative text-[#151515] text-[14px]">
          {isEditing ? (
            <input 
              autoFocus
              className="w-full bg-transparent outline-none border-b border-black/20 text-[#151515]"
              value={task} 
              onChange={(e) => onChange?.(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSave?.();
              }}
              onBlur={() => onSave?.()}
            />
          ) : (
            task
          )}
        </div>

        {/* Edit Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onEdit?.();
          }}
          className={`flex items-center justify-center shrink-0 size-[24px] hover:opacity-70 transition-opacity cursor-pointer ${isEditing ? 'text-[#418b7e]' : 'text-black'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Delete/Trash Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onDelete?.();
          }}
          className="flex items-center justify-center shrink-0 size-[24px] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11V17" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11V17" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Label */}
      {label && (
        <div className="absolute bg-[#fcfee8] content-stretch flex items-center left-[20px] px-[4px] top-[-10px]">
          <div className="[word-break:break-word] flex flex-col font-['Poppins:Regular'] justify-center leading-[16px] not-italic relative shrink-0 text-[#151515] text-[12px] whitespace-nowrap">
            {label}
          </div>
        </div>
      )}
    </div>
  );
}