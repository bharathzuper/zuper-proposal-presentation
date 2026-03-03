import { CheckCircle2 } from "lucide-react";

interface ProductOptionButtonProps {
  optionName: string;
  isSelected: boolean;
  onClick: (e?: React.MouseEvent) => void;
  colorMap: Record<string, string>;
  imageUrl?: string;
  size?: "small" | "medium";
}

export function ProductOptionButton({
  optionName,
  isSelected,
  onClick,
  colorMap,
  imageUrl,
  size = "medium",
}: ProductOptionButtonProps) {
  const hasColor = colorMap[optionName];
  const isSmall = size === "small";
  const textSize = isSmall ? "text-[10px]" : "text-xs";

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center rounded-xl transition-all duration-150 overflow-hidden w-full ${
        isSmall ? "gap-1.5 p-1.5" : "gap-2 p-2"
      } ${
        isSelected
          ? "border-2 border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-[0_0_0_1px_var(--zuper-primary)]"
          : "border-2 border-[var(--zuper-border)] bg-[var(--zuper-card)] hover:border-[var(--zuper-text-tertiary)] hover:shadow-sm"
      }`}
    >
      {hasColor ? (
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: colorMap[optionName] }}
          />
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />
            </div>
          )}
        </div>
      ) : imageUrl ? (
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[var(--zuper-background)]">
          <img
            src={imageUrl}
            alt={optionName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
              <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />
            </div>
          )}
        </div>
      ) : (
        <div className={`relative w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center ${
          isSelected
            ? "bg-[var(--zuper-primary-light)]"
            : "bg-[var(--zuper-background)]"
        }`}>
          {isSelected && (
            <CheckCircle2 className="w-5 h-5 text-[var(--zuper-primary)]" />
          )}
        </div>
      )}
      <span className={`${textSize} text-center leading-tight ${
        isSelected ? "text-[var(--zuper-primary)]" : "text-[var(--zuper-text-secondary)]"
      }`}>
        {optionName}
      </span>
    </button>
  );
}