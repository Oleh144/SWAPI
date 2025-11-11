import { JSX, useCallback, useEffect, useState } from "react";
import { Background, Controls, Edge, MiniMap, Node, ReactFlow } from "@xyflow/react";
import { useSelectedHeroStore } from "@/stores/useSelectedHeroStore";
import { Box, Text } from "@chakra-ui/react";
import '@xyflow/react/dist/style.css';
import { useSWAPIStore } from "@/stores/useSWAPIStore";

function HeroGraph() {
    const { selectedHero } = useSelectedHeroStore();
    const { starships } = useSWAPIStore();
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    interface FlowNode extends Node {
        data: {
            label: JSX.Element;
        }
    }

    useEffect(() => {
        if (!selectedHero) return;

        const radiusFilms = 300;
        const radiusShips = 180;

        const heroNode: FlowNode = {
            id: "hero",
            data: {
                label: (
                    <Box textAlign="center">
                        <Text fontWeight="bold" fontSize="lg">{selectedHero.name}</Text>
                        <Text fontSize="sm">Gender: {selectedHero.gender}</Text>
                        <Text fontSize="sm">Height: {selectedHero.height}cm</Text>
                    </Box>
                ),
            },
            position: { x: 400, y: 200 },
            style: {
                background: "#4299e1",
                color: "white",
                border: "2px solid #2c5282",
                borderRadius: "8px",
                padding: "10px",
                width: 200,
            },
        };

        const films = selectedHero.films || [];
        const heroStarshipIds = selectedHero.starships || [];
        const heroStarships = starships.filter(ship => heroStarshipIds.includes(ship.id));

        const newNodes: Node[] = [heroNode];
        const newEdges: Edge[] = [];

        films.forEach((film, index) => {
            const angle = (index * 2 * Math.PI) / films.length;
            const x = 400 + radiusFilms * Math.cos(angle);
            const y = 200 + radiusFilms * Math.sin(angle);

            newNodes.push({
                id: `film-${index}`,
                data: {
                    label: (
                        <Box textAlign="center">
                            <Text fontWeight="bold" fontSize="lg">Episode {film}</Text>
                        </Box>
                    ),
                },
                position: { x, y },
                style: {
                    background: "#48bb78",
                    color: "white",
                    border: "2px solid #2f855a",
                    borderRadius: "8px",
                    padding: "10px",
                    width: 180,
                },
            });

            newEdges.push({
                id: `edge-hero-film-${index}`,
                source: "hero",
                target: `film-${index}`,
                animated: false,
                style: { stroke: "#4299e1", strokeWidth: 2 },
            });

            heroStarships.forEach((ship, sIndex) => {
                const subAngle = angle + sIndex * (Math.PI / 6);
                const shipX = x + radiusShips * Math.cos(subAngle);
                const shipY = y + radiusShips * Math.sin(subAngle);

                const shipId = `film-${index}-ship-${sIndex}`;

                newNodes.push({
                    id: shipId,
                    data: {
                        label: (
                            <Box textAlign="center">
                                <Text fontWeight="bold">{ship.name}</Text>
                                <Text fontSize="xs">{ship.model}</Text>
                            </Box>
                        ),
                    },
                    position: { x: shipX, y: shipY },
                    style: {
                        background: "#805ad5",
                        color: "white",
                        border: "2px solid #553c9a",
                        borderRadius: "8px",
                        padding: "8px",
                        width: 160,
                    },
                });

                newEdges.push({
                    id: `edge-film-${index}-ship-${sIndex}`,
                    source: `film-${index}`,
                    target: shipId,
                    animated: true,
                    style: { stroke: "#9f7aea", strokeWidth: 1.5 },
                });
            });
        });

        setNodes(newNodes);
        setEdges(newEdges);
    }, [selectedHero]);

    const handleNodeClick = useCallback((_: any, node: Node) => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === node.id
                    ? { ...n, style: { ...n.style, zIndex: 9999 } }
                    : { ...n, style: { ...n.style, zIndex: 1 } }
            )
        );
    }, []);


    return (
        <Box h="100vh" w="100%">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                attributionPosition="bottom-left"
                onNodeClick={handleNodeClick}
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </Box>
    );
}

export default HeroGraph;
