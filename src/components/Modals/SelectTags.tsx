import React from "react";
import chroma from "chroma-js";

import Select, { MultiValue, StylesConfig } from "react-select";
import { useBoundStore } from "@/store/useStore";
import { Tag } from "@/types/TodoTypes";

export type ColorOption = {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
};

type Props = {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTags?: string[];
};

const SelectTags = (props: Props) => {
  const tags = useBoundStore((state) => state.tags);
  const hasHydrated = useBoundStore((state) => state.hasHydrated);
  const ColorOptions: readonly ColorOption[] = tags.map((tag) => {
    const option: ColorOption = {
      value: tag.name,
      label: tag.name,
      color: tag.color,
    };
    return option;
  });

  const defaultOptions: readonly ColorOption[] =
    props.selectedTags?.map((tag) => {
      const option: ColorOption = {
        value: tag,
        label: tag,
        color: tags.find((t) => t.name === tag)?.color || "gray",
      };
      return option;
    }) || [];

  console.log(
    "🚀 ~ file: SelectTags.tsx:34 ~ SelectTags ~ defaultOptions:",
    defaultOptions
  );

  const colourStyles: StylesConfig<ColorOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };
  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={hasHydrated ? ColorOptions : []}
      styles={colourStyles}
      required
      onChange={(e: MultiValue<ColorOption>) => {
        if (e) {
          const values = e.map((option) => option.value);
          props.setTags(values);
        }
      }}
      defaultValue={defaultOptions}
    />
  );
};

export default SelectTags;
