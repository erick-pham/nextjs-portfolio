"use client";

import { IconButton } from "@mui/material";
import toast from "react-hot-toast";
import { deleteRuleSet } from "../actions";
import { useServerAction } from "@/hooks/useServerAction";
import { DeleteOutlined } from "@mui/icons-material";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const DeleteRuleSet = ({
  ruleSetId,
}: {
  ruleSetId: string;
}): React.ReactElement => {
  const [runAction, isPending] = useServerAction(deleteRuleSet);

  const handleConfirmationDeleteRuleSet = async (): Promise<void> => {
    const deleteRuleSetRes = await runAction(ruleSetId);
    if (deleteRuleSetRes?.success) {
      toast.success(deleteRuleSetRes.message);
    }
  };

  return (
    <ConfirmationDialog
      title="Confirmation"
      description="Are you sure you want to proceed?"
      handleClickOk={handleConfirmationDeleteRuleSet}
    >
      {(showConfirmationDialog: () => void) => (
        <IconButton
          title="Delete"
          color="error"
          onClick={showConfirmationDialog}
        >
          <DeleteOutlined />
        </IconButton>
      )}
    </ConfirmationDialog>
  );
};

export default DeleteRuleSet;
