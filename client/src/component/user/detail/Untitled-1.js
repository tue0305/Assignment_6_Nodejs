<Popover
  open={popupCmt.open || false}
  anchorEl={popupCmt.anchorEl || null}
  onClose={null}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "center",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "center",
  }}
>
  {popupCmt.content}
</Popover>;
