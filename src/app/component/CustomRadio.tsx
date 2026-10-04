import { Radio, cn } from "@nextui-org/react";

export const CustomRadio = (props:any) => {
    const {children, ...otherProps} = props;

    return (
      <Radio
        {...otherProps}
        classNames={{
          base: cn(
            "inline-flex m-0 bg-white hover:bg-gold-50 items-center justify-between",
            "flex-row-reverse max-w-full cursor-pointer rounded-xl gap-4 p-4 border border-gold-200",
            "data-[selected=true]:border-gold data-[selected=true]:bg-gold-50"
          ),
        }}
      >
        {children}
      </Radio>
    );
  };
