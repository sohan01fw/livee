import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DialogPropsType {
  className?: string;
  openText?: string;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  cancelText?: string;
  confirmText?: string;
}

export const Dialog = ({
  className,
  openText,
  title,
  description,
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
}: DialogPropsType) => {
  return (
    <div className={className}>
      <AlertDialog>
        <AlertDialogTrigger className="bg-green-500 hover:cursor-pointer hover:bg-green-400 text-black  rounded-md p-2 text-sm">{`${openText || "Open"}`}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={onCancel}
            >{`${cancelText || "Cancel"}`}</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
            >{`${confirmText || "Confirm"}`}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
