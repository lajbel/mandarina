import type { KaboomCtx } from "kaboom";

export interface LayerPlugin {
    layers: (layersArr: string[], def?: string) => void;
    layer: (name: string) => {
        id: string;
        add: () => void;
        inspect: () => string;
    };
    z: (z: number) => { id: string; userZ: number };
}

export function layerPlugin(k: KaboomCtx): LayerPlugin {
    let userLayers: string[] = [];
    let defLayer = "";
    return {
        layers(layersArr, def) {
            userLayers = layersArr;
            defLayer = def ?? layersArr[0];

            k.onAdd((obj) => {
                if (obj.is("layer")) return;

                obj.use(this.layer(defLayer));
            });
        },
        layer(name: string) {
            return {
                id: "layer",
                add() {
                    if (userLayers.indexOf(name) == -1) {
                        throw new Error(`no layer "${name}"`);
                    }

                    const layerZ = userLayers.indexOf(name);

                    this.z = layerZ * 1000 + (this.userZ ?? 0);
                },

                inspect() {
                    return name;
                },
            };
        },
        z(z) {
            return {
                id: "z",
                userZ: z,
            };
        },
    };
}
