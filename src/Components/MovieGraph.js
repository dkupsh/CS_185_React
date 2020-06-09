import React, { Component } from 'react';

const firebase = require('firebase');
var d3 = require('d3');

export class MovieGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: ["tt0482571", "tt4154796", "tt3794354", "tt2527336", "tt0816692", "tt0468569", "tt3501632", "tt5463162"],
            movie_nodes: [{ id: "Movie-Name", group: 1 }],
            movie_links: [{ source: "1", target: "0" }],
            loaded: false
        };
    }

    drag = (simulation) => {
        function dragStarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
    }

    chart(nodes, links) {
        const width = 1920;
        const height = 1000;

        const obj_nodes = nodes.map(d => Object.create(d));
        const obj_links = links.map(d => Object.create(d));

        const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const color = (node) => {
            if (node.group == 1) {
                return d3.color("blue");
            }
            return d3.color("pink");
        };

        const radius = (node) => {
            if (node.group == 1)
                return 60;
            return 20;
        }

        const picture = (node) => {
            if (node.group == 1) {
                return "url(#" + node.id.split(" ").join("") + ")";
            }
            return d3.color("pink");
        }


        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => { return d.index; }).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));


        var defs = svg.append('svg:defs');

        nodes.forEach((node) => {
            if (node.group == 1) {
                defs.append("svg:pattern")
                    .attr("id", node.id.split(" ").join(""))
                    .attr("width", 1)
                    .attr("height", 1)
                    .append("svg:image")
                    .attr("xlink:href", node.poster)
                    .attr("width", 200)
                    .attr("height", 200)
                    .attr("x", -40)
                    .attr("y", 0);
            }
        });

        const node = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", radius)
            .attr("fill", color)
            .call(this.drag(simulation))
            .attr("fill", picture);

        const text = (node) => {
            if (node.group == 2)
                return node.id;
            return "";
        }

        node.append("svg:title")
            .text(text)

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        return svg.node();
    }


    componentDidMount() {
        this.setState({ loaded: false })

        let ref = firebase.database().ref('Movie')


        ref.on('value', snapshot => {
            const data = [];
            snapshot.forEach(item => {
                var temp = item.val();
                data.push(temp);
            });

            let nodes = [];
            let links = [];

            console.log(data);

            data.forEach((movie) => {
                let group = 1;
                let id = movie.title;
                let poster = movie.poster;
                nodes.push({ id, group, poster });
                movie.actors.split(", ").forEach((actor) => {

                    if (nodes.findIndex(obj => obj.id === actor) <= -1) {
                        group = 2;
                        let id = actor;
                        nodes.push({ id, group });
                    }

                    let source = nodes.findIndex(obj => obj.id === actor);
                    let target = nodes.findIndex(obj => obj.id === movie.title);

                    links.push({ source, target })
                })
            });

            console.log(nodes);
            console.log(links);


            this.setState({
                movies: data,
                movie_nodes: nodes,
                movie_links: links,
                loaded: true
            });

            const elem = document.getElementById("mysvg");
            if (elem) {
                elem.appendChild(this.chart(nodes, links));
            }
        });
    }

    render() {

        return (
            <div id="mysvg">

            </div>
        );
    }
}
export default MovieGraph;