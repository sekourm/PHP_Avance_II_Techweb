<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * techCategories
 */
class techCategories
{
    /**
     * @var int
     */
    private $id;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @var string
     */
    private $name;

    /**
     * @var \AppBundle\Entity\techProjects
     */
    private $projectsByCategories;


    /**
     * Set name
     *
     * @param string $name
     * @return techCategories
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set projectsByCategories
     *
     * @param \AppBundle\Entity\techProjects $projectsByCategories
     * @return techCategories
     */
    public function setProjectsByCategories(\AppBundle\Entity\techProjects $projectsByCategories = null)
    {
        $this->projectsByCategories = $projectsByCategories;

        return $this;
    }

    /**
     * Get projectsByCategories
     *
     * @return \AppBundle\Entity\techProjects 
     */
    public function getProjectsByCategories()
    {
        return $this->projectsByCategories;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $categoriesByTasks;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->categoriesByTasks = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add categoriesByTasks
     *
     * @param \AppBundle\Entity\techTasks $categoriesByTasks
     * @return techCategories
     */
    public function addCategoriesByTask(\AppBundle\Entity\techTasks $categoriesByTasks)
    {
        $this->categoriesByTasks[] = $categoriesByTasks;

        return $this;
    }

    /**
     * Remove categoriesByTasks
     *
     * @param \AppBundle\Entity\techTasks $categoriesByTasks
     */
    public function removeCategoriesByTask(\AppBundle\Entity\techTasks $categoriesByTasks)
    {
        $this->categoriesByTasks->removeElement($categoriesByTasks);
    }

    /**
     * Get categoriesByTasks
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCategoriesByTasks()
    {
        return $this->categoriesByTasks;
    }
}
