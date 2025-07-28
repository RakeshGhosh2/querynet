// "use client";

// // import { useTheme } from "next-themes";
// import { useEffect, useMemo, useState } from "react";
// import { Cloud, fetchSimpleIcons, ICloud, renderSimpleIcon, SimpleIcon } from "react-icon-cloud";


// export const cloudProps: Omit<ICloud, "children"> = {
//     containerProps: {
//         style: {
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//             paddingTop: 40,
//         },
//     },
//     options: {
//         reverse: true,
//         depth: 1,
//         wheelZoom: false,
//         imageScale: 2,
//         activeCursor: "default",
//         tooltip: "native",
//         initial: [0.1, -0.1],
//         clickToFront: 500,
//         tooltipDelay: 0,
//         outlineColour: "#0000",
//         maxSpeed: 0.04,
//         minSpeed: 0.02,
//         // dragControl: false,
//     },
// };

// export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
//     const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
//     const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
//     const minContrastRatio = theme === "dark" ? 2 : 1.2;

//     return renderSimpleIcon({
//         icon,
//         bgHex,
//         fallbackHex,
//         minContrastRatio,
//         size: 42,
//         aProps: {
//             href: undefined,
//             target: undefined,
//             rel: undefined,
//             onClick: (e:any) => e.preventDefault(),
//         },
//     });
// };

// export type DynamicCloudProps = {
//     iconSlugs: string[];
// };

// type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

// export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
//     const [data, setData] = useState<IconData | null>(null);
//     const { theme } = { theme: "dark" };

//     useEffect(() => {
//         fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
//     }, [iconSlugs]);

//     const renderedIcons = useMemo(() => {
//         if (!data) return null;

//         return Object.values(data.simpleIcons).map(icon =>
//             renderCustomIcon(icon, theme || "light")
//         );
//     }, [data, theme]);

//     return (
//         // @ts-ignore
//         <Cloud {...cloudProps}>
//             <>{renderedIcons}</>
//         </Cloud>
//     );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { Cloud } from "react-icon-cloud";
import * as simpleIcons from "simple-icons";

export const cloudProps = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingTop: 40,
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        maxSpeed: 0.04,
        minSpeed: 0.02,
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltip: "native",
        tooltipDelay: 0,
        outlineColour: "#0000",
        imageScale: 2,
        activeCursor: "default",
    },
};

export type DynamicCloudProps = {
    iconSlugs: string[];
};

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
    const theme: "light" | "dark" = "dark";

    const [icons, setIcons] = useState<any[]>([]);

    useEffect(() => {
        const loadedIcons = iconSlugs
            .map((slug) => {
                const key =
                    "si" +
                    slug.charAt(0).toUpperCase() +
                    slug.slice(1).replace(/[-.]/g, "");
                return (simpleIcons as any)[key];
            })
            .filter(Boolean);

        setIcons(loadedIcons);
    }, [iconSlugs]);

    const tags = useMemo(() => {
        const bgHex = "#080510";

        return icons.map((icon) => {
            const encodedSvg = encodeURIComponent(icon.svg);

            return {
                id: icon.slug,
                title: icon.title,  // Moved title to root level
                props: {
                    href: "#",
                    onClick: (e: React.MouseEvent) => e.preventDefault(),
                    style: {
                        display: "inline-block",
                        width: 42,
                        height: 42,
                        backgroundColor: bgHex,
                        borderRadius: 6,
                        margin: 5,
                    },
                    children: (
                        <img
                            alt={icon.title}
                            src={`data:image/svg+xml,${encodedSvg}`}
                            width={42}
                            height={42}
                            draggable={false}
                            style={{ display: "block" }}
                        />
                    )
                }
            };
        });
    }, [icons, theme]);

    return (
        <Cloud 
        tagCanvasOptions={undefined} {...cloudProps}
        tags={tags}        />
    );
}

