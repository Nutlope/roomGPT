import { roomType, themeType } from "../utils/dropdownTypes";

export const rooms: { [key in roomType]: string } = {
    "Living Room": "a living room",
    "Dining Room": "a dining room",
    Bedroom: "a bedroom",
    Bathroom: "a bathroom",
    Office: "an office",
    Kitchen: "a kitchen",
    Basement: "a basement",
    "Gaming Room": "a video gaming room",
    // "Outdoor Patio": ""
};

export const themes: { [key in themeType]: string } = {
    Modern:
        "modern interior design by Annie Leibovitz, clean, uncluttered spaces, minimalistic aesthetic, efficient and practical spaces, wood stone and plants natural materials, white gray beige neutral colors",
    Minimalist:
        "minimalistic interior design by Annie Leibovitz, simplicity, clean, uncluttered, minimalistic aesthetic, white gray and beige neutral colors, calm and serenity, wood stone plants natural materials",
    Professional: "",
    Tropical:
        "tropical interior design by Annie Leibovitz, lush greenery plants, tropical environments of the Caribbean, South Pacific, flowers and trees, green blue yellow bright colors, vibrant tropical atmosphere, wood stone and rattan natural materials, tropical motifs, palm trees, beach scenes",
    Vintage:
        "vintage interior design by Annie Leibovitz, antique furnishings and decor, history and nostalgia, authentic materials and techniques, cohesive, authentic look, carefully chosen decor and furnishings",
    Industrial:
        "industrial interior design by Annie Leibovitz, raw utilitarian, metal, concrete, brick, urban atmosphere, exposed pipe ductwork and wiring, unfinished, white gray black neutral colors, minimalist, clean lines",
    Neoclassic:
        "neoclassic interior design by Annie Leibovitz, classical architecture and aesthetics of ancient Greece and Rome, symmetry, columns and arches, balanced harmonious, highly ornate, intricate patterns, classical motifs, Greek keys, acanthus leave, white gray beige neutral colors",
    Vastu:
        "vastu interior design"
};